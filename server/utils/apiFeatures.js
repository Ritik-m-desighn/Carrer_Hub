class APIFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery; // The Product.find()
    this.queryString = queryString;     // The req.query
  }

 
  filter() {
    // 1. Basic Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 2. Advanced Filtering (The Regex you just did!)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    
    return this; // This allows "Method Chaining"
  }
   sort() {
  if (this.queryString.sort) {
    // MongoDB wants 'price name', but URL might have 'price,name'
    const sortBy = this.queryString.sort.split(',').join(' ');
    this.mongooseQuery = this.mongooseQuery.sort(sortBy);
  } else {
    // Default sort: Newest first
    this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
  }
  return this;
}
paginate() {
  const page = this.queryString.page * 1 || 1; // Default to page 1
  const limit = this.queryString.limit * 1 || 10; // Default to 10 items
  const skip = (page - 1) * limit;

  this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

  return this;
}
}


module.exports = APIFeatures;