import JSZip from "jszip"
import type { Theme } from "../types/theme"

export async function createThemeZip(theme: Theme): Promise<Buffer> {
  const zip = new JSZip()

  // Create theme directory
  const themeDir = zip.folder(theme.name.toLowerCase().replace(/\s+/g, "-"))
  if (!themeDir) throw new Error("Failed to create theme directory")

  // Add style.css
  themeDir.file("style.css", generateStyleCSS(theme))

  // Add functions.php
  themeDir.file("functions.php", generateFunctionsPhp(theme))

  // Add index.php
  themeDir.file("index.php", generateIndexPhp(theme))

  // Add header.php
  themeDir.file("header.php", generateHeaderPhp(theme))

  // Add footer.php
  themeDir.file("footer.php", generateFooterPhp(theme))

  // Add screenshot.png if available
  if (theme.preview_url) {
    const response = await fetch(theme.preview_url)
    const screenshot = await response.arrayBuffer()
    themeDir.file("screenshot.png", screenshot)
  }

  // Generate ZIP file
  return zip.generateAsync({ type: "nodebuffer" })
}

function generateStyleCSS(theme: Theme): string {
  return `/*
Theme Name: ${theme.name}
Description: ${theme.description}
Author: WordPressTG
Version: 1.0
*/

${theme.code}`
}

function generateFunctionsPhp(theme: Theme): string {
  return `<?php
if (!defined('ABSPATH')) exit;

function ${theme.name.toLowerCase().replace(/\s+/g, "_")}_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Register menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', '${theme.name.toLowerCase()}'),
        'footer' => __('Footer Menu', '${theme.name.toLowerCase()}'),
    ));
}
add_action('after_setup_theme', '${theme.name.toLowerCase().replace(/\s+/g, "_")}_setup');

// Enqueue styles and scripts
function ${theme.name.toLowerCase().replace(/\s+/g, "_")}_scripts() {
    wp_enqueue_style('${theme.name.toLowerCase()}-style', get_stylesheet_uri());
    wp_enqueue_script('${theme.name.toLowerCase()}-script', get_template_directory_uri() . '/js/script.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', '${theme.name.toLowerCase().replace(/\s+/g, "_")}_scripts');`
}

function generateIndexPhp(theme: Theme): string {
  return `<?php get_header(); ?>

<main id="main" class="site-main">
    <?php
    if (have_posts()) :
        while (have_posts()) :
            the_post();
            get_template_part('template-parts/content', get_post_type());
        endwhile;

        the_posts_navigation();
    else :
        get_template_part('template-parts/content', 'none');
    endif;
    ?>
</main>

<?php get_footer(); ?>`
}

function generateHeaderPhp(theme: Theme): string {
  return `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header id="masthead" class="site-header">
    <div class="site-branding">
        <?php
        if (has_custom_logo()) :
            the_custom_logo();
        else :
            ?>
            <h1 class="site-title">
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <?php bloginfo('name'); ?>
                </a>
            </h1>
            <?php
        endif;
        ?>
    </div>

    <nav id="site-navigation" class="main-navigation">
        <?php
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id' => 'primary-menu',
        ));
        ?>
    </nav>
</header>`
}

function generateFooterPhp(theme: Theme): string {
  return `<footer id="colophon" class="site-footer">
    <div class="site-info">
        <nav class="footer-navigation">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'footer',
                'menu_id' => 'footer-menu',
            ));
            ?>
        </nav>
        
        <div class="copyright">
            &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>`
}

