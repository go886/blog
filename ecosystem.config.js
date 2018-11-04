module.exports = {
  apps : [{
    name: 'blog',
    script: './server/main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '3080',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'admin',
      host : 'localhost',
      ref  : 'origin/master',
      repo : 'git@github.com::go886/blog.git',
      path : '/volume1/web/blog',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
