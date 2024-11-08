import { DataSource } from "typeorm"

export let AppDataSource = new DataSource({
    host: 'localhost',
    port: 1433,
    database: 'ssl_project',
    type: 'mssql',
    entities: ['./entities/*.entity.ts'],
    synchronize: false,
    logging: false,
    username: 'sa',
    password: '123456',
    options: {
        trustServerCertificate: true
    }
})


AppDataSource.initialize().then((res) => {
    console.log("AppDataSource Initialized")
})