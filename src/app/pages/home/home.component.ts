import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, TranslateDirective, TranslateService } from '@wawjs/ngx-translate';

import { ArticleService } from '@wawjs/ngx-horeca';
import { companyProfile } from '../../feature/company/company.data';
import { DiscountService } from '@wawjs/ngx-horeca';
import { EventService } from '@wawjs/ngx-horeca';
import { JobService } from '@wawjs/ngx-horeca';
import { ProductService } from '@wawjs/ngx-horeca';
import { ProfileService } from '@wawjs/ngx-horeca';
import { QuestService } from '@wawjs/ngx-horeca';
import { ReviewService } from '@wawjs/ngx-horeca';
import { RoomService } from '@wawjs/ngx-horeca';

const HOME_TRANSLATION_PATH = '/data/home/i18n';

type FeaturePreview = {
	eyebrow: string;
	title: string;
	summary: string;
	meta?: string;
	itemRoute: string;
	allRoute: string;
	seeAllLabel: string;
	imageSrc?: string;
	imageAlt?: string;
};

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslateDirective],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly _languageService = inject(LanguageService);
	private readonly _translateService = inject(TranslateService);
	private readonly _articleService = inject(ArticleService);
	private readonly _discountService = inject(DiscountService);
	private readonly _eventService = inject(EventService);
	private readonly _jobService = inject(JobService);
	private readonly _productService = inject(ProductService);
	private readonly _profileService = inject(ProfileService);
	private readonly _questService = inject(QuestService);
	private readonly _reviewService = inject(ReviewService);
	private readonly _roomService = inject(RoomService);

	protected readonly company = companyProfile;
	protected readonly horecaHighlights = [
		'Εστιατόρια, καφέ, ξενοδοχεία, μπαρ και ομάδες catering μπορούν να παρουσιάσουν τα βασικά σε ένα σημείο.',
		'Οι επισκέπτες μπορούν να περάσουν από την ανακάλυψη στη δράση μέσα από το μενού, το πλαίσιο του χώρου, την κοινωνική απόδειξη και τις επιλογές επικοινωνίας.',
		'Οι στατικές, φιλικές προς SEO σελίδες κάνουν τις βασικές πληροφορίες της επιχείρησης εύκολες στην ανάγνωση σε υπολογιστή και κινητό.',
	];
	protected readonly featurePreviews = computed(() => {
		const article = this._articleService.articles()[0];
		const discount = this._discountService.discounts()[0];
		const event = this._eventService.events()[0];
		const job = this._jobService.jobs()[0];
		const product = this._productService.products()[0];
		const profile = this._profileService.profiles()[0];
		const quest = this._questService.quests()[0];
		const review = this._reviewService.reviews()[0];
		const room = this._roomService.rooms()[0];
		const previews: Array<FeaturePreview | null> = [
			article
				? {
						eyebrow: 'Άρθρο',
						title: article.title,
						summary: article.summary,
						meta: article.category,
						itemRoute: `/article/${article.slug}`,
						allRoute: '/articles',
						seeAllLabel: 'Δείτε όλα τα άρθρα',
					}
				: null,
			room
				? {
						eyebrow: 'Δωμάτιο',
						title: room.name,
						summary: room.description,
						meta: room.price,
						itemRoute: `/room/${room.slug}`,
						allRoute: '/rooms',
						seeAllLabel: 'Δείτε όλα τα δωμάτια',
						imageSrc: room.image,
						imageAlt: room.imageAlt,
					}
				: null,
			discount
				? {
						eyebrow: 'Έκπτωση',
						title: discount.title,
						summary: discount.summary,
						meta: discount.period,
						itemRoute: `/discount/${discount.slug}`,
						allRoute: '/discounts',
						seeAllLabel: 'Δείτε όλες τις εκπτώσεις',
					}
				: null,
			event
				? {
						eyebrow: 'Εκδήλωση',
						title: event.title,
						summary: event.summary,
						meta: event.dateLabel,
						itemRoute: `/event/${event.slug}`,
						allRoute: '/events',
						seeAllLabel: 'Δείτε όλες τις εκδηλώσεις',
					}
				: null,
			product
				? {
						eyebrow: 'Προϊόν',
						title: product.title,
						summary: product.summary,
						meta: product.price,
						itemRoute: `/product/${product.slug}`,
						allRoute: '/products',
						seeAllLabel: 'Δείτε όλα τα προϊόντα',
					}
				: null,
			review
				? {
						eyebrow: 'Κριτική',
						title: review.title,
						summary: review.body,
						meta: review.author,
						itemRoute: `/review/${review.slug}`,
						allRoute: '/reviews',
						seeAllLabel: 'Δείτε όλες τις κριτικές',
					}
				: null,
			quest
				? {
						eyebrow: 'Δραστηριότητα',
						title: quest.title,
						summary: quest.summary,
						meta: quest.duration,
						itemRoute: `/quest/${quest.slug}`,
						allRoute: '/quests',
						seeAllLabel: 'Δείτε όλες τις δραστηριότητες',
					}
				: null,
			job
				? {
						eyebrow: 'Θέση εργασίας',
						title: job.title,
						summary: job.summary,
						meta: job.location,
						itemRoute: `/job/${job.slug}`,
						allRoute: '/jobs',
						seeAllLabel: 'Δείτε όλες τις θέσεις εργασίας',
					}
				: null,
			profile
				? {
						eyebrow: 'Προφίλ ομάδας',
						title: profile.name,
						summary: profile.description,
						meta: profile.role,
						itemRoute: `/profile/${profile.slug}`,
						allRoute: '/team',
						seeAllLabel: 'Δείτε όλα τα μέλη της ομάδας',
						imageSrc: profile.image,
						imageAlt: profile.name,
					}
				: null,
		];

		return previews.filter((preview): preview is FeaturePreview => preview !== null);
	});

	constructor() {
		effect(() => {
			if (!this._isBrowser) {
				return;
			}

			const language = this._languageService.language();

			void this._translateService.loadExtraTranslations([
				HOME_TRANSLATION_PATH,
				'/data/article/i18n',
				'/data/discount/i18n',
				'/data/event/i18n',
				'/data/job/i18n',
				'/data/product/i18n',
				'/data/profile/i18n',
				'/data/quest/i18n',
				'/data/review/i18n',
				'/data/room/i18n',
			], { language });
		});
	}
}
