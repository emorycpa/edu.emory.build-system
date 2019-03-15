# edu.emory.build-system
Build System for Emory University CPA Websites

These instructions will get you started using the Emory University CPA Website Build System.

## Prerequisites

Be sure to have the following installed:

* [Node.js](https://nodejs.org/en/download/current/)
* [Git](https://git-scm.com/downloads)
* [Visual Studio Code](https://code.visualstudio.com/download)

## Getting Started

1. Download this project to your local machine.
2. Make a new repository on the EmoryCPA github account.
3. Add yourself as a collaborator: Settings > Collaborators > you@emory.edu
4. Check your email for the collaboration invite and accept.
5. Open the project you downloaded and Git Bash inside the base folder.
5. Follow the instructions to initialize the new repository.
```
echo "# new.project.name" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/emorycpa/new.project.name.git
git push -u origin master
```
7. Open your project in Visual Studio Code.
8. Go to the Source Control tab and stage, commit, and push all the files to your new repository.
9. Update README.md for the new repository.

## Navigating the template

All development, code, and markup modification should occur inside the `src/` directory. Source files for vector and raster graphics, PDFs, and other guides should be placed inside the `design-documents/` directory.

Inside the `src/` directory:
### Static Resources
* `fonts/` - Webfonts
* `html/` - HTML
* `images/` - Images & Graphics
* `js/` - Javascript

### Dynamic Resources
* `less/` - Less (CSS)
* `mustache/` - Mustache (HTML)
* `njk/` - Nunjucks (HTML)
* `scss/` - SCSS (CSS)
* `ts/` - TypeScript (Javascript)

### Build Defaults

* Static resrouces include javascript, images, and fonts
* SCSS for styling
* Nunjecks for templating


### Understanding the templating conventions ()

Inside the `njk/` directory:

* `pages/` - All generic page layouts and types
* `templates/` - Small bits of markup that are put together to form entire pages

Inside the `mustache/`:

* `pages/` - All generic page layouts and types. Note: each *.mustache file requires a *.json for page data. 
* `partials/` - Small bits of markup that are put together to form entire pages

## Installing node_modules and launching Local Host

If you have not install Gulp.js Command Line Tools

```
npm install gulp-cli -g
```

Once you have cloned this repository, open the command line and run:

```
npm i
```

Then once all Node modules are installed, run:

```
gulp
```

This will launch a page in your default browser on localhost:3000.

## Configuration Options

See sample build JSON with comment for options [build-config-documentation.md](build-config-documentation.md)

## Authors

* **Bryce Roberts** - *Initialization* - [bryce.leitner.roberts@gmail.com](mailto:bryce.leitner.roberts@gmail.com)
* **Kayla Pratt** - *Front-end templatizing* - [kaylapratt.com](http://kaylapratt.com)

See also the list of [contributors](https://github.com/emorycpa/emory.dev/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details