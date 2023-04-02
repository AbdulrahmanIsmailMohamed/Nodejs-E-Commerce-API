class APIFeature {
    constructor(mongooseQuery, queryString) {
        if (!mongooseQuery) {
            throw new Error('mongooseQuery parameter is required');
        }
        if (!queryString) {
            throw new Error('queryString parameter is required');
        }
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;

    }

    filter() {
        // filtration
        const queryObj = { ...this.queryString };
        const deleteQuery = ["limit", "page", "sort", "select", "keyword"];
        deleteQuery.forEach((field) => delete queryObj[field]);

        // Apply Filtration Using [gte | gt | lte | lt]
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this
    }

    pagination(countDocument) {
        const limit = this.queryString.limit * 1 || 5;
        const page = this.queryString.page * 1 || 1;
        const skip = (page - 1) * limit;

        // Pagination Result
        const endIndex = limit * page;
        let paginate = {};
        paginate.currentPage = page;
        paginate.numberOfPages = countDocument / limit;
        paginate.limit = limit;
        if (endIndex < countDocument) paginate.nextPage = page + 1
        if (skip > 0) paginate.prev = page - 1;

        this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = paginate;
        return this
    }

    search() {
        if (this.queryString.keyword) {
            let filter = {}
            filter.$or = [
                { title: { $regex: this.queryString.keyword, $options: "i" } },
                { description: { $regex: this.queryString.keyword, $options: "i" } },
            ]
            this.mongooseQuery = this.mongooseQuery.find(filter);
        }
        return this
    }

    limiting() {
        let selectBy;
        if (this.queryString.select) {
            selectBy = this.queryString.select.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(selectBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.select("-__v")
        }
        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createAt');
        }
        return this;
    }
}

module.exports = APIFeature