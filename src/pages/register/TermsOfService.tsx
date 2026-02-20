import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <>
      <h4 className="font-semibold">{title}</h4>
      <ul className="list-disc pr-5 ltr:pl-5 ltr:pr-0 space-y-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default function TermsOfService({
  agreed,
  onToggle,
  error,
}: {
  agreed: boolean;
  onToggle: () => void;
  error: boolean;
}) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-[#008545] hover:underline cursor-pointer"
      >
        {t('register.terms.viewTerms')}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {expanded && (
        <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-gray-300 bg-white p-4 text-xs text-gray-700 leading-relaxed space-y-3">
          <h3 className="font-bold text-sm">{t('register.terms.tosTitle')}</h3>
          <p>{t('register.terms.tosIntro')}</p>

          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const).map((n) => (
            <div key={n} className="space-y-1">
              <h4 className="font-semibold">{t(`register.terms.s${n}Title`)}</h4>
              <p>{t(`register.terms.s${n}Body`)}</p>
            </div>
          ))}

          <hr className="my-3 border-gray-300" />

          <h3 className="font-bold text-sm">{t('register.terms.privacyTitle')}</h3>
          <p>{t('register.terms.privacyIntro')}</p>

          <ListSection
            title={t('register.terms.p1Title')}
            items={t('register.terms.p1Items', { returnObjects: true }) as string[]}
          />

          <ListSection
            title={t('register.terms.p2Title')}
            items={t('register.terms.p2Items', { returnObjects: true }) as string[]}
          />

          <h4 className="font-semibold">{t('register.terms.p3Title')}</h4>
          <p>{t('register.terms.p3Body')}</p>

          <h4 className="font-semibold">{t('register.terms.p4Title')}</h4>
          <p>{t('register.terms.p4Intro')}</p>
          <ul className="list-disc pr-5 ltr:pl-5 ltr:pr-0 space-y-1">
            {(t('register.terms.p4Items', { returnObjects: true }) as string[]).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t('register.terms.p4Outro')}</p>

          <ListSection
            title={t('register.terms.p5Title')}
            items={t('register.terms.p5Items', { returnObjects: true }) as string[]}
          />
          <p>{t('register.terms.p5Contact')}</p>

          <h4 className="font-semibold">{t('register.terms.p6Title')}</h4>
          <p>{t('register.terms.p6Body')}</p>

          <h4 className="font-semibold">{t('register.terms.p7Title')}</h4>
          <p>{t('register.terms.p7Body')}</p>
        </div>
      )}

      <label className="flex items-center gap-2 mt-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={onToggle}
          className="w-4 h-4 accent-[#008545]"
        />
        <span className="text-sm text-gray-600">
          {t('register.terms.agree')}
        </span>
      </label>
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {t('register.terms.required')}
        </p>
      )}
    </div>
  );
}
