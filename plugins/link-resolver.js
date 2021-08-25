/**
 * To learn more about Link Resolving check out the Prismic documentation
 */

export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'blog_home') {
    return '/'
  }

  if (doc.type === 'educ') {
    return '/educ/' + doc.uid
  }
  if (doc.type === 'refer') {
    return '/refer/' + doc.uid
  }
  if (doc.type === 'exp') {
    return '/exp/' + doc.uid
  }
  if (doc.type === 'conoc') {
    return '/conoc/' + doc.uid
  }
  if (doc.type === 'camp') {
    return '/camp/' + doc.uid
  }

  return '/not-found'
}