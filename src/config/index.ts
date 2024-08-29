import { ConfigFactory, ConfigObject } from "@nestjs/config";

const config: ConfigFactory = (): ConfigObject => ({
  database: {
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: false,
  },
});

export default config;
