module.exports = {
  port: 8081,
  rewrite: [
    {
      from: '/api/(.*)',
      to: 'http://localhost:7777/api/$1'
    },
  ],
  directory: 'build',
  logFormat: 'stats'
}
