<?php
/**
 * Helper functions
 *
 * @package ShinyCode
 * @since 1.0.1
 * @copyright Copyright (c) 2018 Cedaro, LLC
 * @license   GPL-2.0-or-later
 */

declare ( strict_types = 1 );

namespace Cedaro\WP\BlockType\Code;

/**
 * Display a notice about missing dependencies.
 *
 * @since 1.0.1
 */
function display_missing_dependencies_notice() {
	$message = sprintf(
		/* translators: %s: documentation URL */
		__( 'Shiny Code is missing required dependencies. <a href="%s" target="_blank" rel="noopener noreferer">Learn more.</a>', 'shiny-code' ),
		'https://github.com/cedaro/shiny-code#installation'
	);

	printf(
		'<div class="shiny-code-compatibility-notice notice notice-error"><p>%s</p></div>',
		wp_kses(
			$message,
			[
				'a' => [
					'href'   => true,
					'rel'    => true,
					'target' => true,
				],
			]
		)
	);
}
