import { initializeDatabase, synchronizeDatabase } from "./databaseHelper/databaseFunctions";

var Database = function(){
    var connection = initializeDatabase();
    synchronizeDatabase(connection);
}

export default Database;