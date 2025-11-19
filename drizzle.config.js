/** @type {import("drizzle-kit").Config} */
export default {
    schema:"./configs/schema.ts",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_vS1jDwExF8pa@ep-spring-bar-ad837z4r-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    }
};