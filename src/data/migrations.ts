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
      ); 
       
       CREATE TABLE IF NOT EXISTS Temas(
         id_Temas INT AUTO_INCREMENT PRIMARY KEY,
         titulo VARCHAR(100),
         descricão TEXT ,
         Data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         );
        
         CREATE TABLE IF NOT EXISTS quiz(
            id INT AUTO_INCREMENT PRIMARY KEY,
            perguntas VARCHAR(64) NOT NULL,
            A_alter VARCHAR(64) NOT NULL,
            B_alter VARCHAR(64) NOT NULL,
            C_alter VARCHAR(64) NOT NULL,
            D_alter VARCHAR(64) NOT NULL,
            resposta VARCHAR(64) NOT NULL,
            id_Temas INT,
            FOREIGN KEY (id_Temas) REFERENCES Temas(id_Temas)
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