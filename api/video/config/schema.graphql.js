module.exports = {
  query:`
    videoPagination(
      start:Int,
      limit:Int,
      name:String,
    ): [Video]
  `,
  resolver: {
    Query:{
      videoPagination: async( params,{limit, start,name }) =>{
        const query = {
          _limit: limit,
          _start: start,
          ...(name && {
            name: new RegExp(name, 'i')
          }),
        }
        const posts = await strapi.query('video').find(query);
        return posts;
      },
    }
  }
}
