<?php
/**
 * Shiny Code
 *
 * @package   ShinyCode
 * @copyright Copyright (c) 2018, Cedaro, LLC
 * @license   GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Shiny Code
 * Plugin URI:        https://github.com/cedaro/shiny-code
 * Description:       A Gutenberg block for editing and displaying code with syntax highlighting.
 * Version:           1.0.0
 * Author:            Cedaro
 * Author URI:        https://www.cedaro.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       shiny-code
 * Domain Path:       /languages
 * Requires PHP:      7.0
 * GitHub Plugin URI: cedaro/shiny-code
 * Release Asset:     true
 */

declare ( strict_types = 1 );

namespace Cedaro\WP\BlockType\Code;

use Cedaro\WP\Plugin\Provider\I18n;

// Exit if accessed directly.
if ( ! \defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Plugin version.
 *
 * @var string
 */
const VERSION = '1.0.0';

/**
 * Load the Composer autoloader.
 */
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}

// Create the main plugin instance.
$shiny_code = ( new Plugin() )
	->set_basename( plugin_basename( __FILE__ ) )
	->set_directory( plugin_dir_path( __FILE__ ) )
	->set_file( __DIR__ . '/shiny-code.php' )
	->set_slug( 'shiny-code' )
	->set_url( plugin_dir_url( __FILE__ ) );

// Register hook providers.
$shiny_code
	->register_hooks( new I18n() )
	->register_hooks( new BlockType\Code() )
	->register_hooks( new Provider\PrismAssets() )
	->register_hooks( new Provider\Settings() );
