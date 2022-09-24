import faunadb, { query as q } from 'faunadb';

const client = new faunadb.Client({ secret: "fnAExLQW6XAASzu2nmTsQpv0D8Bu5Mf1P5byfoSH", domain: 'db.us.fauna.com' })

module.exports = async (req, res) => {
    const {id, content} = req.body;
    try{    
        const data = await client.query(
            q.Create(
                q.Collection('Post'),
                {
                    data: {
                        owner: id,
                        content: content,
                    }
                }
            )
        )
        res.status(200).json(data);
        if (data.name === 'BadRequest') return // if there's an error in the data creation
    } catch {
        res.status(500)
    }
}