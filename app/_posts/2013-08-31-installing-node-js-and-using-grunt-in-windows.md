---
layout: post
title: Installing Node.js and using Grunt in Windows
date: 2013-08-31 17:20:45 +13:00
---
![](/img/2013/aug/nodejs.png)

I've recently started using Grunt to auto build change logs for the PHP framework I've developed at Xplore, and I'm interested in doing the same for DIVA. Doing this in OS X is one thing, Windows I'm expecting to be completely another. I figured I'd document this for my own reference when I need to do it again.

Trying all this in Server 2012 trail running in a VM if it makes any difference.

##Installing Node.js and NPM
First thing is download the Node.js installer from [http://nodejs.org/](http://nodejs.org/). I left all the defaults on such as including NPM and adding to the PATH variables.

Running **npm** from PowerShell worked right away! (always a pleasant surprise when dealing with \*nixy things in Windows land)

![](/img/2013/aug/node01.png)

The whole point of having Node.js available is the fantastic library of modules available, which you can install via the **Node Package Manager**, or **npm** command line. These packages need to be installed per project. Rather than having to manually install them every time, you can define a list of requirements in a **package.json** file in the root of your directory. You could build this by hand, or instead run **npm init** in your project root.

![](/img/2013/aug/node03.png)

This will prompt you to set up some default parameters, such as project name, current version, author, git location, and so on. You should now be left with a **package.json** in your project root which looks similar to:

```
{
 "name": "DIVA",
 "version": "2.4.2",
 "description": "DIVA Distributed Media System",
 "repository": {
   "type": "git",
   "url": "https://github.com/mattdwen/DIVA"
 },
 "author": "Matt Dwen",
 "license": "Group 6 Technologies DIVA License",
 "bugs": {
   "url": "https://github.com/mattdwen/DIVA/issues"
 }
}
```

Since I'm not building an actual Node.js application, and just utilising **npm**, I've striped out most of the properties. The full specs can be found at [https://npmjs.org/doc/json.html](https://npmjs.org/doc/json.html).

##Installing Grunt
Now we can start defining our project dependancies. For now, all I want is Grunt:

```
{
 "name": "DIVA",
 "version": "2.4.2",
 "devDependencies": {
   "grunt": "~0.4.1"
 }
}
```

Here I've basically defined that development is dependant on a package called **grunt** of which I require approximately version 0.4.1. This means when I update my dependancies, I'll get any version  &lt; 0.5.0. This syntax uses **semver**, which is defined over at [https://npmjs.org/doc/misc/semver.html](https://npmjs.org/doc/misc/semver.html), and is really powerful at defining what versions you allow.

I should now be able to install grunt to my project, by executing **npm install**:

![](/img/2013/aug/node04.png)

It'll automatically find all the dependancies for grunt and retrieve them as well. You should now have a **node_packages** directory in your project directory which contains Grunt.

##Configuring Grunt
Grunt is a bit more complex to configure. It has it's own packages, which come from npm again, and basically runs as it's own little application, of which each step can use the dependancies. I'm looking to automate the building of my CHANGELOG.md, which [grunt-conventional-changelog](https://github.com/btford/grunt-conventional-changelog), which uses commit messages based on the [AngularJS](http://angularjs.org/) [commit rules](https://docs.google.com/a/group6.co.nz/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) to generate the log.

First, I need to add this dependancy to my package.json:

```
{
 "name": "DIVA",
 "version": "2.4.2",
 "devDependencies": {
   "grunt": "~0.4.1",
   "grunt-conventional-changelog": "~1.0.0"
 }
}
```

Now I need to define **Gruntfile.js** in my project root:

```
module.exports = function (grunt) {
  // Grunt plugins
  grunt.loadNpmTasks('grunt-conventional-changelog');
  // Config
  grunt.initConfig({
    changelog: {
      options: {
        github: 'mattdwen/diva'
      }
    }
  });
  // Alias tasks
  grunt.registerTask('package', ['changelog']);
  grunt.registerTask('default', ['package']);
};
```

First it's loading the changelog package from npm. Next it's defining the initialisation config for each of the plugins, in this case just the changelog I've already loaded. Last I'm setting up a handfull of shortcuts, which run a series of tasks, in the order defined. Grunt looks for a **default** task by default.

Now all I need to do is run **grunt** in the project root. It runs fine, but does't actually do anything yet as I haven't made any git commits yet! Once I've added one in...

![](/img/2013/aug/node05.png)

And I end up with the following in CHANGELOG.md:

```
### v2.4.2 (2013-08-31)

#### Features

* **npm:** Added package.json ([b9d187a3](http://github.com/mattdwen/diva/commit/b9d187a323b55beb305b19d21436bd72b0824deb))
```

Which is all fairly fancy-pants if you ask me! Certainly beats building it by hand.

##Version Control
You end up with a lot of additional files once the packages are installed, just like Nuget. The only files you need to commit are **packages.json** and **Gruntfile.js**, and of course anything you generate which you need to keep. The **node_packages** directory can be added to your **.gitignore**.
