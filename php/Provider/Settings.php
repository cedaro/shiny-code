<?php
/**
 * Plugin settings.
 *
 * @package   ShinyCode
 * @copyright Copyright (c) 2018, Cedaro, LLC
 * @license   GPL-2.0-or-later
 * @since     1.0.0
 */

declare ( strict_types = 1 );

namespace Cedaro\WP\BlockType\Code\Provider;

use Cedaro\WP\Plugin\AbstractHookProvider;

/**
 * Plugin settings provider.
 *
 * @package ShinyCode
 * @since   1.0.0
 */
class Settings extends AbstractHookProvider {
	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		$this->add_action( 'init', 'register_settings' );
	}

	/**
	 * Register plugin settings.
	 */
	protected function register_settings() {
		register_setting(
			'shiny_code',
			'shiny_code_highlight_color',
			[
				'type'              => 'string',
				'description'       => esc_html__( 'Color for highlighted lines.', 'shiny-code' ),
				'sanitize_callback' => 'sanitize_hex_color',
				'show_in_rest'      => true,
				'default'           => '',
			]
		);

		register_setting(
			'shiny_code',
			'shiny_code_theme',
			[
				'type'              => 'string',
				'description'       => esc_html__( 'Slug for the active syntax highlighting theme.', 'shiny-code' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'default'           => 'atom-one-light',
			]
		);
	}
}
