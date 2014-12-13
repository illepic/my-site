echo "Started: `date`"
cd $HOME/Dropbox/my-jekyll-site
jekyll build
echo "Done building Jekyll: `date`"
rsync -vruhi --del --log-file=$HOME/Dropbox/my-jekyll-site/_scripts/rsync-log.txt $HOME/Sites/my-jekyll-site-html/ evlove@evanlovely.com:/home/evlove/www/evanlovely.com/public/
echo "Done rsyncing files: `date`"
$HOME/Dropbox/scripts/pushover.sh "My Site" "Production:Done Deploying" "http://evanlovely.com" "Live Site"
