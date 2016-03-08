module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify:
            build: {
                src: [
                    'src/pixi.js',
                    'src/tween.js',
                    'src/randomcolor.js',
                    'src/SpaceShooter.js',
                    'src/SpaceShooter.Player.js',
                    'src/SpaceShooter.Assets.js',
                    'src/SpaceShooter.Enemies.js',
                    'src/SpaceShooter.Levels.js',
                    'src/SpaceShooter.Tools.js',
                    'src/game.js'
                ],
                dest: 'build/game.js'
            }
        },
        copy: {
            assets: {
                src: 'src/assets/*',
                dest: 'build/assets/',
                flatten: true,
                expand: true,
                filter: 'isFile'
            },
            html: {
              src: 'src/index.html',
              dest: 'build/index.html'
            },
            css: {
              src: 'src/game.css',
              dest: 'build/game.css'
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy']);

};
