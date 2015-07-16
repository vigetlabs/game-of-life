/**
 * Provides a catchall routing mechanism to serve a standard
 * template.
 *
 * Additional logic SHOULD go here to better resolve 404s and other
 * routing logic
 */

module.exports = [
  {
    method: 'GET',
    path: '/{any*}',
    config: {
      handler: {
        view: 'index'
      }
    }
  }
]
