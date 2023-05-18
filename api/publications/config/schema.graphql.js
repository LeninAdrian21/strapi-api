module.exports = {
  query:`
    publicationsPagination(
      start:Int,
      limit:Int,
      text:String,
    ): [Publications]
  `,
  resolver: {
    Query:{
      publicationsPagination: async( params,{limit, start,text }) =>{
        const query = {
          _limit: limit,
          _start: start,
          ...(text && {
            text: new RegExp(text, 'i')
          }),
        }
        const posts = await strapi.query('publications').find(query);
        return posts;
      },
    }
 }
}
