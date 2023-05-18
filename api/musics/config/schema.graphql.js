module.exports = {
  query:`
    musicsPagination(
      start:Int,
      limit:Int,
      name:String,
      song:String,
      algum:String
    ): [Musics]
  `,
  resolver: {
    Query:{
      musicsPagination: async( params,{limit, start,name,song,algum }) =>{
        const query = {
          _limit: limit,
          _start: start,
          ...(name && {
            name: new RegExp(name, 'i')
          }),
          ...(song && {
            song: new RegExp(song, 'i')
          }),
          ...(algum && {
            algum: new RegExp(algum, 'i')
          }),
        }
        const posts = await strapi.query('musics').find(query);
        return posts;
      },
    }
 }
}
