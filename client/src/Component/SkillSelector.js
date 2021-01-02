export const skillList = [
    { skill: ' HTML' },
    { skill: ' SASS' },
    { skill: ' CSS' },
    { skill: ' SCSS' },
    { skill: ' C'},
    { skill: ' C#'},
    { skill: ' C++'},
    { skill: ' SQL'},
    { skill: ' Java'},
    { skill: ' Javascript'},
    { skill: ' XML'},
    { skill: ' Perl'},
    { skill: ' Python'},
    { skill: ' PHP'},
    { skill: ' Objective-C'},
    { skill: ' AJAX'},
    { skill: ' ASP.NET'},
    { skill: ' Ruby'},
    { skill: ' Golang'},
    { skill: ' Dart'},
    { skill: ' React Native'},
    { skill: ' React'},
    { skill: ' Postman'},
    { skill: ' Flutter'},
    { skill: ' Rust'},
    { skill: ' R'},
    { skill: ' Matlab'},
    { skill: ' Swift'},
    { skill: ' Assembly Language'},
    { skill: ' Scratch'},
    { skill: ' TypeScript'},
    { skill: ' Kotlin'},
    { skill: ' VBA'},
    { skill: ' Visual Basic'},
    { skill: ' Scala'},
    { skill: ' Julia'},
    { skill: ' PostgresQL'},
    { skill: ' MongoDB'},
    { skill: ' Redis'},
    { skill: ' Web Socket'},
    { skill: ' socket.io'},
    { skill: ' Cobra'},
    { skill: ' AWS Lambda'},
    { skill: ' AWS Kubernetes'},
    { skill: ' AWS Redshift'},
    { skill: ' Azure'},
    { skill: ' Docker'},
    { skill: ' Erlang'},
    { skill: ' Clojure'},
    { skill: ' Elm'},
    { skill: ' Pascal'},
    { skill: ' Emerald'},
    { skill: ' Elixir'},
    { skill: ' Node.Js'},
    { skill: ' Express'},
    { skill: ' Angular'},
    { skill: ' Vue.js'},
    { skill: ' TensorFlow'},
    { skill: ' graphQL'},
    { skill: ' Jest'},
    { skill: ' Mocha'},
    { skill: ' Chai'},
    { skill: ' Figma'},
    { skill: ' Adobe XD'},
    { skill: ' Opal'},
    { skill: ' Nginx'},
    { skill: ' Cisco'},
    { skill: ' Linux'},
    { skill: ' Oracle'},
    { skill: ' Arduino'},
    { skill: ' SAP'},
    { skill: ' Git'},
    { skill: ' Service Workers'},
    { skill: ' Selenium'},
    { skill: ' Firebase'},
    { skill: ' Tableau'},
    { skill: ' Tailwind CSS'},
    { skill: ' GCP'},
    { skill: ' Pug'},
    { skill: ' Unity'},
    { skill: ' WordPress'},
    { skill: ' Android'},
    { skill: ' iOS'},
    { skill: ' Laravel'},
    { skill: ' Bootstrap'},
    { skill: ' jQuery'},
    { skill: ' MySQL'},
    { skill: ' Knex'},
    { skill: ' SQLite3'},
    { skill: ' Sequelize'},
    { skill: ' MariaDB'},
    { skill: ' MSSQL'},
    { skill: ' Bookshelf.js'},
    { skill: ' Redux'},
    { skill: ' Spring'},
    { skill: ' Django'},
    { skill: ' Apache Kafka'},
    { skill: ' Apache Spark'},
    { skill: ' Apache Cassandra'},
    { skill: ' Flask'},
    { skill: ' Terraform'},
].sort((a,b)=>{
    let fa = a.skill.toLowerCase(),
        fb = b.skill.toLowerCase();

    if (fa < fb) {
        return -1;
    }

    if (fa > fb) {
        return 1;
    }
    
    return 0;
})
