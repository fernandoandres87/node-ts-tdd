export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://test:test@mongotest1-shard-00-00.7zogm.mongodb.net:27017,mongotest1-shard-00-01.7zogm.mongodb.net:27017,mongotest1-shard-00-02.7zogm.mongodb.net:27017/CRMGraphQL?ssl=true&replicaSet=mongoTest1-shard-0&authSource=admin&retryWrites=true&w=majority',
    port: process.env.PORT || 4000
}