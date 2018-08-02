<?php
/**
 * Code block type.
 *
 * @package   ShinyCode
 * @copyright Copyright (c) 2018, Cedaro, LLC
 * @license   GPL-2.0-or-later
 * @since     1.0.0
 */

declare ( strict_types = 1 );

namespace Cedaro\WP\BlockType\Code\BlockType;

use Cedaro\WP\Plugin\AbstractHookProvider;

use const Cedaro\WP\BlockType\Code\VERSION;

/**
 * Code block type provider.
 *
 * @package ShinyCode
 * @since   1.0.0
 */
class Code extends AbstractHookProvider {
	/**
	 * Register hooks.
	 *
	 * @since 1.0.0
	 */
	public function register_hooks() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		$this->add_action( 'init', 'register_block_type' );
		$this->add_action( 'enqueue_block_editor_assets', 'enqueue_editor_assets' );

		if ( ! is_admin() ) {
			$this->add_action( 'enqueue_block_assets', 'enqueue_assets' );
		}
	}

	/**
	 * Register the code block type.
	 *
	 * @since 1.0.0
	 */
	protected function register_block_type() {
		register_block_type( 'cedaro/code', [
			'title'       => esc_html( 'Shiny Code', 'shiny-code' ),
			'description' => esc_html__( 'Edit and display code with syntax highlighting.', 'shiny-code' ),
			'icon'        => 'editor-code',
			'category'    => 'formatting',
			'attributes'  => [
				'content'         => [
					'type'     => 'string',
					'source'   => 'text',
					'selector' => 'code',
				],
				'highlightLines'  => [
					'type'    => 'array',
					'default' => [],
				],
				'language'        => [
					'type' => 'string',
				],
				'showLineNumbers' => [
					'type'    => 'boolean',
					'default' => true,
				],
			],
			'supports'    => [
				'align' => [ 'full', 'wide' ],
				'html'  => false,
			],
		] );
	}

	/**
	 * Enqueue block assets for the frontend.
	 *
	 * @since 1.0.0
	 */
	protected function enqueue_assets() {
		wp_enqueue_script( 'prism' );

		// @todo Determine which languages are used in a block.
		$languages = [ 'css', 'javascript', 'php' ];
		foreach ( $languages as $language ) {
			$handle = 'prism-' . $language;
			if ( wp_script_is( $handle, 'registered' ) ) {
				wp_enqueue_script( $handle );
			}
		}

		$theme  = get_option( 'cedaro_code_theme', 'atom-one-light' );
		$handle = 'prism-theme-' . $theme;
		if ( wp_style_is( $handle, 'registered' ) ) {
			wp_enqueue_style( $handle );
		}
	}

	/**
	 * Enqueue block assets for the editor.
	 *
	 * @since 1.0.0
	 */
	protected function enqueue_editor_assets() {
		wp_enqueue_style( 'code-editor' );

		wp_enqueue_style(
			'cedaro-code-block-editor',
			$this->plugin->get_url( 'build/css/editor.css' ),
			[ 'wp-blocks' ],
			VERSION
		);

		wp_enqueue_script(
			'cedaro-code-block-editor',
			$this->plugin->get_url( 'build/js/editor.js' ),
			[ 'code-editor', 'wp-blocks', 'wp-element' ],
			VERSION,
			true
		);

		$themes = $this->plugin->get_themes();

		wp_localize_script( 'cedaro-code-block-editor', '_shinyCode', [
			'languages' => $this->plugin->get_languages(),
			'themes'    => $themes,
		] );

		foreach ( $themes as $theme => $data ) {
			if ( empty( $data['codemirror'] ) ) {
				continue;
			}

			wp_enqueue_style(
				'codemirror-theme-' . $theme,
				$data['codemirror'],
				[],
				VERSION
			);
		}
	}
}
