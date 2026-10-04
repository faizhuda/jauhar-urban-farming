import CMS, { type CustomFieldControlProps } from '@sveltia/cms';
import { businessSchema } from '../utils/site-settings';
import { MIN_PRICE, DESCRIPTION_MIN, DESCRIPTION_MAX } from '../utils/content-rules';

const h = CMS.React.createElement;
const demo = import.meta.env.DEV && document.querySelector('#demo-config') !== null;
const businessLabels: Record<string, string> = {
  name: 'Farm name',
  tagline: 'Short tagline',
  whatsapp: 'WhatsApp number',
  'address.street': 'Street / campus address',
  'address.locality': 'City',
  'address.region': 'State / territory',
  'address.postalCode': 'Postal code',
  'hours.days': 'Open on',
  'hours.opens': 'Opening time',
  'hours.closes': 'Closing time',
  hours: 'Opening hours',
  'socials.instagram': 'Instagram profile link',
  'geo.lat': 'Latitude',
  'geo.lng': 'Longitude',
};

function choice(props: CustomFieldControlProps, choices: { label: string; value: boolean }[]) {
  return h(
    'div',
    { className: 'jauhar-choices', role: 'group', 'aria-label': props.field.get('label') },
    ...choices.map((option, index) =>
      h(
        'label',
        { key: option.label, className: 'jauhar-choice' },
        h('input', {
          type: 'radio',
          id: index === 0 ? props.forID : `${props.forID}-${index}`,
          name: props.forID,
          checked: props.value === option.value,
          onChange: () => props.onChange(option.value),
        }),
        option.label,
      ),
    ),
  );
}

CMS.registerFieldType(
  'publication',
  (props) =>
    choice(props, [
      { label: 'Draft — hidden', value: true },
      { label: 'Published', value: false },
    ]),
  (props) => h('p', null, props.value ? 'Draft — hidden' : 'Published'),
);
CMS.registerFieldType(
  'availability',
  (props) =>
    choice(props, [
      { label: 'Available', value: true },
      { label: 'Unavailable', value: false },
    ]),
  (props) => h('p', null, props.value ? 'Available' : 'Unavailable'),
);

// Use the built-in preview so field checks also work in mobile and embedded browsers.
CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    const data = entry.get('data').toJS();
    const collection = entry.get('collection');
    if (collection === 'settings') {
      const result = businessSchema.safeParse(data);
      if (!result.success)
        throw new Error(
          result.error.issues
            .map((issue) => {
              const label = businessLabels[issue.path.join('.')] ?? 'Business information';
              return `${label}: ${issue.message}`;
            })
            .join('\n'),
        );
    }
    if (collection === 'products' && (!Number.isFinite(data.price) || data.price < MIN_PRICE)) {
      throw new Error('Price must be a number greater than zero.');
    }
    if (
      ['products', 'journal', 'pages'].includes(collection) &&
      (typeof data.description !== 'string' ||
        data.description.length < DESCRIPTION_MIN ||
        data.description.length > DESCRIPTION_MAX)
    ) {
      throw new Error(`Write a description of ${DESCRIPTION_MIN}–${DESCRIPTION_MAX} characters.`);
    }
  },
});
CMS.registerEventListener({
  name: 'postSave',
  handler: ({ entry }) => {
    const notice = document.querySelector<HTMLElement>('#save-notice');
    if (notice)
      notice.textContent = demo
        ? 'Demo saved in this browser. The public website has not changed.'
        : entry.getIn(['data', 'draft'])
          ? 'Draft saved. It stays hidden from visitors.'
          : 'Saved. The website is updating. Use Visit website in a few minutes to check the result.';
  },
});

// The demo is available only in the development build and cannot write to GitHub.
const demoConfig = demo
  ? JSON.parse(document.querySelector('#demo-config')!.textContent!)
  : undefined;
const root = document.querySelector<HTMLElement>('#nc-root')!;
const managerUrl = new URL('/admin/', root.dataset.siteUrl!);
if (!import.meta.env.DEV && window.location.origin !== managerUrl.origin) {
  // The OAuth callback belongs to the canonical website, not a preview deployment.
  const section = document.createElement('section');
  section.className = 'manager-access';
  const heading = document.createElement('h1');
  heading.textContent = 'Manage content on the live website';
  const description = document.createElement('p');
  description.textContent =
    'You are viewing a website preview. Open the live website manager to sign in and edit content.';
  const link = document.createElement('a');
  link.href = managerUrl.href;
  link.textContent = 'Open Website Manager';
  section.append(heading, description, link);
  root.replaceChildren(section);
} else {
  void CMS.init(demoConfig ? { config: demoConfig } : undefined);
}
