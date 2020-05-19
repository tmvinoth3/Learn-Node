'use strict'

const Job = use('App/Models/Job');

class JobController {
    async home({view}){
        //Fetch jobs
        const jobs = await Job.all();

        return view.render('index', {jobs: jobs.toJSON()});
    }

    async postjob({request, response, session, auth}){

        const job = request.all();

        const posted = await auth.user.jobs().create({
            title: job.title,
            link: job.link,
            description: job.description
        });

        session.flash({ message: 'Your job has been posted!' });
        return response.redirect('back');

    }

    async userJobs({view, auth}){

        const jobs =  await auth.user.jobs().fetch();
        return view.render('jobs.postjob', {jobs: jobs.toJSON()});

    }

    async delete({response, session, params}){

        const job =  await Job.find(params.id);
        
        await job.delete();
        session.flash({ message: 'Your job has been removed'});
        return response.redirect('back');

    }

    async editJob({view, response, params}){

        const job =  await Job.find(params.id);
        
        return view.render('jobs.editjob', {job: job.toJSON()});

    }

    async updateJob({request, response, session, params}){

        const job =  await Job.find(params.id);
        
        const {title, link, description} = request.all();

        job.title = title;
        job.link = link;
        job.description = description;

        await job.save();

        session.flash({ message: 'Your job has been updated!' });
        return response.redirect('/post-job');

    }
}

module.exports = JobController
