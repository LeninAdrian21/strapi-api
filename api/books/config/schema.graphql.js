module.exports = {
  query:`
    booksPagination(
      start:Int,
      limit:Int,
      name:String,
      author:String,
      editorial:String
    ): [Books]
  `,
  resolver: {
    Query:{
      booksPagination: async( params,{limit, start,name,author,editorial }) =>{
        const query = {
          _limit: limit,
          _start: start,
          ...(name && {
            name: new RegExp(name, 'i')
          }),
          ...(author && {
            author: new RegExp(author, 'i')
          }),
          ...(editorial && {
            editorial: new RegExp(editorial, 'i')
          }),
        }
        const posts = await strapi.query('books').find(query);
        return posts;
      },
    }
 }
}
