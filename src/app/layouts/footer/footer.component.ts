import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	selector: 'app-footer',
	imports: [RouterLink, RouterLinkActive, TranslateDirective],
	templateUrl: './footer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	protected readonly navItems = [
		{ label: 'Πλοήγηση', icon: 'navigation', route: '/navigation', exact: true },
		{ label: 'Γκαλερί', icon: 'photo_library', route: '/gallery', exact: true },
		{ label: 'Κοινωνικά δίκτυα', icon: 'share', route: '/socials', exact: true },
		{ label: 'Κράτηση', icon: 'book_online', route: '/book', exact: true },
		{ label: 'Μενού', icon: 'restaurant_menu', route: '/menu', exact: true },
	];
}
