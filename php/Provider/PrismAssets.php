<?php
/**
 * PrismJS assets.
 *
 * @package ShinyCode
 * @copyright Copyright (c) 2018, Cedaro, LLC
 * @license GPL-2.0-or-later
 * @since 0.1.0
 */

declare ( strict_types = 1 );

namespace Cedaro\WP\BlockType\Code\Provider;

use Cedaro\WP\Plugin\AbstractHookProvider;

use const Cedaro\WP\BlockType\Code\VERSION;

/**
 * PrismJS assets provider.
 *
 * @package ShinyCode
 * @since 0.1.0
 */
class PrismAssets extends AbstractHookProvider {
	/**
	 * Register hooks.
	 *
	 * @since 0.1.0
	 */
	public function register_hooks() {
		$this->add_action( 'init', 'register_assets', 0 );
	}

	/**
	 * Register assets.
	 *
	 * @since 0.1.0
	 */
	protected function register_assets() {
		wp_register_script(
			'prism',
			$this->plugin->get_url( 'assets/js/vendor/prism.js' ),
			[],
			'1.29.0',
			true
		);

		$languages = $this->plugin->get_languages();

		foreach ( $languages as $language => $data ) {
			if ( empty( $data['prism'] ) ) {
				continue;
			}

			wp_register_script(
				'prism-' . $language,
				$data['prism'],
				[ 'prism' ],
				VERSION,
				true
			);
		}

		$themes = $this->plugin->get_themes();

		foreach ( $themes as $theme => $data ) {
			if ( empty( $data['prism'] ) ) {
				continue;
			}

			wp_register_style(
				'prism-theme-' . $theme,
				$data['prism'],
				[],
				VERSION
			);
		}
	}
}
