---
title: Photo Geotag Tools
weight: 3
excerpt: >-
  A Bash function for revealing where a photo was taken along with an Alfred
  Extension for it.
tags:
  - alfred
  - photography
  - bash
  - maps
---
I created a very simple `bash` function for revealing it's latitude and longitude, copying them, and then opening it in Google Maps. And of course, I then made a quick Alfred Workflow for it. 

# Bash Function #

Add this to your `~/.bash_functions` (or wherever you keep them):

```bash
# Run on photos with embedded geo-data to get the coordinates and open it in a map
whereisthis() {
  lat=$(mdls -raw -name kMDItemLatitude "$1")
  if [ "$lat" != "(null)" ]; then
    long=$(mdls -raw -name kMDItemLongitude "$1")
    echo -n $lat,$long | pbcopy
    echo $lat,$long copied
    open https://www.google.com/maps?q=$lat,$long
  else
    echo "No Geo-Data Available"
  fi
}
```

If you copy that code above and then run `pbpaste >> ~/.bash_functions` it will add at the bottom there for you.

Then, you can run `whereisthis photo.jpg` to find out where the photo was taken. 

![Example](whereisthis-example.png)


# Alfred Workflow #

1. Install the [Workflow](/utilities/photo-geotags/Where Was This Photo Taken.alfredworkflow) by downloading it.
2. Just select any file and go the Actions menu and select "Where Was This Photo Taken?"
3. Your browser will open to a Google Maps page at the location.

I thought about restricting it to only JPGs, but then realized movies could get geo-tagged, and actually any file could get a location assigned, so I left the file type restriction un-set.

Hope this helps some of you out there!