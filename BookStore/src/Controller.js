const Author = require('./models/Author');

class Controller{
    errHandler = (err) =>{
        console.log(err);
    }

    createAuthor = (name, res) => {    
        Author.create({name: name})
        .then((data)=>{
            res.send(data.id)
        })
        .catch(this.errHandler);    
    }

    getAuthors = (id, res) => {
        var condition = id ? { id: id } : null;
        Author.findAll({where: condition})
        .then(data => { 
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving authors."
          });
        });
    };

    updateAuthor = (id,body,res) =>{
        Author.update(body, {
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Author was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Author with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Author with id=" + id
              });
            });
    }

    deleteAuthor = (id, res) => {
        Author.destroy({
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Author was deleted successfully!"
                });
              } else {
                res.send({
                  message: `Cannot delete author with id=${id}. Maybe author was not found!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Could not delete author with id=" + id
              });
            });
    }
}

module.exports = Controller;