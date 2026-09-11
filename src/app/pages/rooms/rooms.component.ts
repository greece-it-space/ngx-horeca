import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoomService } from '@wawjs/ngx-horeca';
import { TranslateDirective } from '@wawjs/ngx-translate';
import { RoomBookingFormComponent } from '../../components/room-booking-form/room-booking-form.component';
import { companyPhoneHref, companyProfile } from '../../feature/company/company.data';

type ContactLink = {
	label: string;
	href: string;
	description: string;
};

@Component({
	imports: [NgOptimizedImage, RoomBookingFormComponent, RouterLink, TranslateDirective],
	templateUrl: './rooms.component.html',
	styleUrl: './rooms.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
	private readonly _roomService = inject(RoomService);

	protected readonly amenities = [
		'Άνετα δωμάτια',
		'Πρωινό για επισκέπτες',
		'Εστιατόριο ή καφέ στον χώρο',
		'Υπηρεσία δωματίου',
		'Wi‑Fi στα δωμάτια',
		'Πάρκινγκ',
		'Χώρος εργασίας',
		'Κλιματισμός',
		'Μεταφορά κατόπιν αιτήματος',
		'Υποστήριξη κρατήσεων',
	];
	protected readonly loadingCards = [1, 2, 3];
	protected readonly rooms = this._roomService.rooms;
	protected readonly isLoading = this._roomService.isLoading;
	protected readonly hasRooms = computed(() => this.rooms().length > 0);
	protected readonly company = companyProfile;

	protected readonly contactLinks: ContactLink[] = [
		{
			label: 'Καλέστε μας',
			href: companyPhoneHref,
			description: companyProfile.phone,
		},
		{
			label: 'Συνομιλία στο Viber',
			href: 'https://example.com/horeca/viber',
			description: 'Γρήγορη συνομιλία για κράτηση',
		},
		{
			label: 'Συνομιλία στο Telegram',
			href: 'https://example.com/horeca/telegram',
			description: '@horeca_hotel',
		},
	];

	constructor() {
		effect(() => {
			this._roomService.loadTranslations();
		});
	}
}
