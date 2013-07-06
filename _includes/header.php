<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7 ie7andLess ie8andLess ie9andLess" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8 ie8andLess ie9andLess" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width" />
<title>
<?php if (is_archive()) {
  echo 'Category';
}
the_title(); ?>
 by <?php bloginfo('name');?>
 ~ <?php bloginfo('description'); ?>

</title>
<title>

<!-- <?php // WordPress custom title script

// is the current page a tag archive page?
if (function_exists('is_tag') && is_tag()) { 

  // if so, display this custom title
  echo 'Tag Archive for &quot;'.$tag.'&quot; - '; 

// or, is the page an archive page?
} elseif (is_archive()) { 

  // if so, display this custom title
  wp_title(''); echo ' Archive - '; 

// or, is the page a search page?
} elseif (is_search()) { 

  // if so, display this custom title
  echo 'Search for &quot;'.wp_specialchars($s).'&quot; - '; 

// or, is the page a single post or a literal page?
} elseif (!(is_404()) && (is_single()) || (is_page())) { 

  // if so, display this custom title
  wp_title(''); echo ' - '; 

// or, is the page an error page?
} elseif (is_404()) {

  // yep, you guessed it
  echo 'Not Found - '; 

}
// finally, display the blog name for all page types
bloginfo('name'); 

?> -->

</title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script src="/tricky-name/wp-content/themes/guru/js/modernizr.js" type="text/javascript"></script>
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<?php wp_nav_menu( array(
	'menu' => 'Primary Menu',
	'container' => 'nav',
	'container_id' => 'primary-nav',
	'container_class' => ''
)); ?>
<div id="search"> <?php get_search_form() ?> </div>

<div id="wrapper" class="hfeed site">
	<div id="header-trees" class="pointless-div"></div>
	<div id="container"><div class="inner">
	<h1 id="site-name"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
    <img src="<?php bloginfo('stylesheet_directory'); ?>/img/logo.png" alt="<?php bloginfo( 'name' ); ?>">
  </a></h1>
	<header id="masthead" class="site-header" role="banner">
	<!-- <h2 class="site-description"><?php bloginfo( 'description' ); ?></h2> -->
		<?php $header_image = get_header_image();
		if ( ! empty( $header_image ) ) : ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header-image"><img src="<?php echo esc_url( $header_image ); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="" /></a>
		<?php endif; ?>
		<?php wp_nav_menu( array(
			'menu' => 'Primary Menu',
			'container' => 'nav',
			'container_id' => 'primary-clone',
			'container_class' => ''
		)); ?>
		<nav class="my-social-sites">		
      <ul id="menu-my-social-sites-1" class="menu">
        <li>
          <a href="http://twitter.com/EvanLovely" target="_blank" class="ss-icon ss-social-circle" title="Twitter">Twitter</a>
        </li>
        <li>
          <a href="http://www.linkedin.com/in/evanlovely" target="_blank" class="ss-icon ss-social-circle" title="LinkedIn">LinkedIn</a>
        </li>
        <li><a href="http://zerply.com/EvanLovely/public" target="_blank" class="ss-icon ss-social-circle" title="Zerply">Zerply</a></li>
        <li>
          <a href="http://www.flickr.com/photos/footfun/" target="_blank" class="ss-icon ss-social-circle" title="Flickr">Flickr</a>
        </li>
        <li>
          <a href="http://instagram.com/evanlovely" target="_blank" class="ss-icon ss-social-circle" title="Instagram">Instagram</a>
        </li>
        <li>
          <a href="http://pinterest.com/evanlovely/" target="_blank" class="ss-icon ss-social-circle" title="Pinterest">Pinterest</a>
        </li>
        <!-- <li>
        <a href="https://forrst.com/people/EvanLovely/posts" target="_blank"></a></li
        > -->
        <li>
          <a href="https://github.com/evanlovely" target="_blank" class="ss-social-circle ss-icon" title="GitHub">githuboctocat</a>
        </li>
        <li>
          <a href="http://open.spotify.com/user/evanlovely" target="_blank" class="ss-social-circle ss-icon" title="Spotify">Spotify</a>
        </li>
        <li><a href="http://facebook.com/evanlovely" class="ss-icon ss-social-circle" target="_blank" title="Facebook">Facebook</a></li>
      </ul>
		</nav>
	</header><!-- #masthead -->


	<div id="main" class="clearfix wrapper">