const gulp = require("gulp");
const gutil = require("gulp-util");
const exec = require("child_process").exec;
const execSync = require("child_process").execSync;
const notifier = require("node-notifier");
const packageJson = require("./package.json");

gulp.task("upgrade", (callback) => {
  exec("yarn outdated --json", (err, stdout) => {
    if (err) {
      gutil.log(err);
      return;
    }
    if (stdout !== "") {
      const packages = JSON.parse(stdout).data.body;
      packages.forEach((info) => {
        const name = info[0];
        const current = info[1];
        const wanted = info[2];
        if (current !== wanted) {
          const c = `yarn upgrade ${name}`;
          const msg = `upgrading ${name}`;
          gutil.log(msg);
          notifier.notify({
            title: packageJson.name,
            message: msg,
          });
          execSync(c);
        }
      });
    }
    const msg = "upgrading...";
    gutil.log(msg);
    notifier.notify({
      title: packageJson.name,
      message: msg,
    });
    execSync("yarn upgrade");
    callback();
  });
});
