import connetion from "./connetion";

const printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
  };

  const createTables = async () => {
    try {
      await connetion.raw(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(36) PRIMARY KEY ,
          name VARCHAR(64) NOT NULL,
          nickname VARCHAR(64) NOT NULL,
          email VARCHAR(64) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
      )`);
     console.log('tabela criada com sucesso')
      }catch(error){
        printError(error);
      }finally{
        closeConnection();
      }
    }
    
    const closeConnection = () => {
        connetion.destroy();
      };

      createTables();