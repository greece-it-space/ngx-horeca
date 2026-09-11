import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [RouterLink, TranslateDirective],
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	protected readonly navItems = [
		{ label: 'Σχετικά με εμάς', icon: 'info', route: '/about' },
		{ label: 'Προϊόντα', icon: 'shopping_bag', route: '/products' },

		{ label: "Μενού ημέρας", icon: 'today', route: '/daily' },
		{ label: 'Εποχιακές προσφορές', icon: 'local_florist', route: '/seasonal' },

		{ label: 'FAQ', icon: 'help', route: '/questions' },
		{ label: 'Κανόνες', icon: 'gavel', route: '/rules' },

		{ label: 'Δωμάτια', icon: 'hotel', route: '/rooms' },
		{ label: 'Εκπτώσεις', icon: 'local_offer', route: '/discounts' },

		{ label: 'Ομάδα', icon: 'group', route: '/team' },
		{ label: 'Θέσεις εργασίας', icon: 'work', route: '/jobs' },

		{ label: 'Άρθρα', icon: 'article', route: '/articles' },
		{ label: 'Κριτικές', icon: 'rate_review', route: '/reviews' },

		{ label: 'Εκδηλώσεις', icon: 'event', route: '/events' },
		{ label: 'Δραστηριότητες', icon: 'map', route: '/quests' },

		{ label: 'Σπα', icon: 'Σπα', route: '/spa' },
		{ label: 'Επιβράβευση', icon: 'workspace_premium', route: '/loyalty' },

		{ label: 'Για πακέτο', icon: 'takeout_dining', route: '/takeaway' },
		{ label: 'Catering', icon: 'room_service', route: '/catering' },
	];
}
