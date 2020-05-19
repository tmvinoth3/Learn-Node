'use strict'

class PostJob {
  get rules () {
    return {
      'title': 'required',
      'link': 'required',
      'description': 'required'
    }
  }

  get messages() {
    return {
      'required': '{{ field }} is required.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }
}

module.exports = PostJob
