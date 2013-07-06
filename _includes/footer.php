<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?>
	</div><!-- #main .wrapper -->
	<footer id="footer" class="content-bg row-fluid" role="contentinfo">
    <aside class="span4">
      <h4 class="title">Latest Instagram</h4>
      <?php echo do_shortcode('[instapress userid="self" piccount="1" size="400"]'); ?>
      <br>
      <a href="http://instagram.com/evanlovely" class="btn btn-small btn-block">More Instagram Photos <i class="icon-camera-retro"></i></a>
    </aside>
    <aside class="span4">
      <h4 class="title">Latest Tweets</h4>
      <a class="twitter-timeline" href="https://twitter.com/EvanLovely" data-widget-id="308094870399094784">Tweets by @EvanLovely</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

    </aside>
    <aside class="span4">
      <h4 class="title">Public Notes</h4>
      <?php wp_nav_menu( array(
        'menu'            => 'Secondary Menu', 
        'container'       => 'nav', 
        'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>'
        ));     
      ?>
      </aside>
		<div class="site-info">
        © Evan Lovely ~ 2013 ~ EvanLovely.com v 4.0
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div></div></div><!-- #wrapper, #container, .inner -->
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/css/bootstrap/docs/assets/js/jquery.js"></script>
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/css/bootstrap/js/bootstrap-carousel.js"></script>
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/css/bootstrap/js/bootstrap-transition.js"></script>
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/css/bootstrap/js/bootstrap-tooltip.js"></script>
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/css/bootstrap/js/bootstrap-tab.js"></script>
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/js/jquery.masonry.min.js"></script>
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/js/tinynav.min.js"></script>
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/js/ss-social.js"></script>
<script type="text/javascript" src="/tricky-name/wp-content/themes/guru/js/script.js"></script>
<?php wp_footer(); ?>
</body>
</html>