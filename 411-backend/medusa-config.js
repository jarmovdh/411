const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
 case "production":
   ENV_FILE_NAME = ".env.production";
   break;
 case "staging":
   ENV_FILE_NAME = ".env.staging";
   break;
 case "test":
   ENV_FILE_NAME = ".env.test";
   break;
 case "development":
 default:
   ENV_FILE_NAME = ".env";
   break;
}

try {
 dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
 `medusa-fulfillment-manual`,
 `medusa-payment-manual`,
 {
   resolve: `@medusajs/file-local`,
   options: {
     upload_dir: "uploads",
   },
 },
 {
   resolve: "@medusajs/admin",
   options: {
     autoRebuild: true,
     develop: {
       open: process.env.OPEN_BROWSER !== "false",
     },
   },
 },
 {
   resolve: "medusa-plugin-resend",
   options: {
     api_key: process.env.RESEND_API_KEY,
     from: process.env.SES_FROM,
     enable_endpoint: process.env.SES_ENABLE_ENDPOINT,
     template_path: process.env.SES_TEMPLATE_PATH,
     subject_template_type: process.env.RESEND_SUBJECT_TEMPLATE_TYPE,
     body_template_type: process.env.RESEND_BODY_TEMPLATE_TYPE,
     order_placed_template: 'order_placed',
     order_shipped_template: 'order_shipped',
     customer_password_reset_template:'customer_password_reset'
   },
 },
];

const customApiPath = "./src/api";
const hasCustomApi = fs.existsSync(path.resolve(process.cwd(), customApiPath));

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  // Only include customApi if it exists
  ...(hasCustomApi && {
    customApi: {
      resolve: customApiPath,
      options: {
        customOptions: {}
      }
    }
  }),
  serviceModules: [
    {
      resolve: `${__dirname}/dist/services/subscription-request`,
      options: {},
    },
  ],
};



module.exports = {
 projectConfig: {
   redis_url: REDIS_URL,
   database_url: DATABASE_URL,
   database_type: "postgres",
   store_cors: STORE_CORS,
   admin_cors: ADMIN_CORS,
   database_extra: process.env.NODE_ENV !== "development"
     ? { ssl: { rejectUnauthorized: false } }
     : {},
   jwtSecret: process.env.JWT_SECRET,
   cookieSecret: process.env.COOKIE_SECRET,
 },
 plugins,
 modules,
};