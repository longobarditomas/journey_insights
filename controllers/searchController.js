const getPopularCities = async (req, res, next) => {
    try {
        const popularCities = {
            "africa": {
                "cairo": "http://localhost:8000/insights?city=cairo&country=egypt",
                "cape_town": "http://localhost:8000/insights?city=cape+town&country=south+africa",
                "nairobi": "http://localhost:8000/insights?city=nairobi&country=kenya",
            },
            "asia": {
                "beijing": "http://localhost:8000/insights?city=beijing&country=china",
                "tokyo": "http://localhost:8000/insights?city=tokyo&country=japan",
                "seoul": "http://localhost:8000/insights?city=seoul&country=south+korea",
                "bangkok": "http://localhost:8000/insights?city=bangkok&country=thailand",
            },
            "europe": {
                "berlin": "http://localhost:8000/insights?city=berlin&country=germany",
                "lisbon": "http://localhost:8000/insights?city=lisbon&country=portugal",
                "london": "http://localhost:8000/insights?city=london&country=uk",
                "paris": "http://localhost:8000/insights?city=paris&country=france",
                "rome": "http://localhost:8000/insights?city=rome&country=italy",
                "madrid": "http://localhost:8000/insights?city=madrid&country=spain",
            },
            "north_america": {
                "new_york": "http://localhost:8000/insights?city=new+york&country=usa",
                "los_angeles": "http://localhost:8000/insights?city=los+angeles&country=usa",
                "toronto": "http://localhost:8000/insights?city=toronto&country=canada",
                "mexico_city": "http://localhost:8000/insights?city=mexico+city&country=mexico",
            },
            "south_america": {
                "buenos_aires": "http://localhost:8000/insights?city=buenos+aires&country=argentina",
                "sao_paulo": "http://localhost:8000/insights?city=sao+paulo&country=brazil",
                "santiago": "http://localhost:8000/insights?city=santiago&country=chile",
                "bogota": "http://localhost:8000/insights?city=bogota&country=colombia",
            },
            "australia": {
                "sydney": "http://localhost:8000/insights?city=sydney&country=australia",
                "melbourne": "http://localhost:8000/insights?city=melbourne&country=australia",
            }
        };
        
        res.status(200).send(popularCities);
    } catch (error) {
        next(error);
    }
};

module.exports = { getPopularCities };