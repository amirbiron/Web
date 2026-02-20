import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
        className="flex items-center gap-1 text-sm text-[#00bf63] hover:underline cursor-pointer"
      >
        {t('register.terms.viewTerms')}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {expanded && (
        <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-gray-300 bg-white p-4 text-xs text-gray-700 leading-relaxed space-y-3">
          <h3 className="font-bold text-sm">🧾 תנאי שימוש – DD</h3>
          <p>
            ברוך הבא ל־DD – אפליקציה המספקת תכנים יומיים (&quot;כרטיסים
            יומיים&quot;) לשיפור אישי, השראה וצמיחה רוחנית ורגשית. השימוש
            באפליקציה מהווה הסכמה לתנאים המפורטים להלן.
          </p>

          <h4 className="font-semibold">1. מטרת השירות</h4>
          <p>
            האפליקציה נועדה לשימוש אישי בלבד, ומאפשרת למשתמשים לקבל תכנים
            יומיים, לעקוב אחרי יוצרים, ולצפות בכרטיסים ייחודיים. השירות ניתן
            &quot;כמות שהוא&quot; (AS IS), ללא אחריות לתוכן, זמינות או תוצאות
            השימוש.
          </p>

          <h4 className="font-semibold">2. חשבון משתמש</h4>
          <p>
            יש ליצור חשבון באמצעות דוא&quot;ל או אמצעי התחברות אחרים. המשתמש
            מתחייב לספק מידע נכון, מלא ומעודכן. הנהלת DD רשאית להשעות או למחוק
            חשבון משתמש בכל עת, אם נעשה שימוש בניגוד לתנאים אלה.
          </p>

          <h4 className="font-semibold">3. גיל מינימלי לשימוש</h4>
          <p>
            השירות מיועד למשתמשים מגיל 13 ומעלה. אם המשתמש מתחת לגיל 13 –
            נדרש אישור הורה או אפוטרופוס לשימוש באפליקציה.
          </p>

          <h4 className="font-semibold">4. קניין רוחני</h4>
          <p>
            כל התוכן באפליקציה – לרבות טקסטים, עיצובים, תמונות, סרטונים, לוגו
            ושם המותג DD – מוגן בזכויות יוצרים. אין להעתיק, להפיץ, לשכפל או
            לעשות שימוש מסחרי באף חלק מהאפליקציה ללא אישור מראש ובכתב מהנהלת
            DD.
          </p>

          <h4 className="font-semibold">5. תוכן שנוצר על ידי משתמשים</h4>
          <p>
            משתמשים רשאים לשלוח תכנים כגון כרטיסים או הצעות. בהעלאת תוכן,
            המשתמש מאשר כי הוא הבעלים החוקיים של החומר ומעניק ל־DD רישיון חופשי
            לשימוש בו לצורכי הצגה או קידום. DD רשאית להסיר תכנים פוגעניים, לא
            ראויים או מפרים זכויות יוצרים.
          </p>

          <h4 className="font-semibold">6. הודעות Push והתראות</h4>
          <p>
            האפליקציה עשויה לשלוח הודעות יומיות עם תכנים חדשים או עדכונים. ניתן
            לבטל קבלת התראות בכל עת דרך הגדרות המכשיר.
          </p>

          <h4 className="font-semibold">7. תשלומים</h4>
          <p>
            האפליקציה ניתנת לשימוש חופשי. אם בעתיד יתווספו תכנים או שירותים
            בתשלום – הדבר יובהר בבירור לפני חיוב.
          </p>

          <h4 className="font-semibold">8. קישורים ותוכן חיצוני</h4>
          <p>
            ייתכן שיוצגו קישורים לאתרים חיצוניים. DD אינה אחראית לתוכן,
            לאמינות או למדיניות הפרטיות של אתרים אלו.
          </p>

          <h4 className="font-semibold">9. אחריות ושיפוי</h4>
          <p>
            השירות ניתן &quot;As-Is&quot;. DD אינה אחראית לנזקים ישירים או
            עקיפים כתוצאה מהשימוש. המשתמש מתחייב לשפות את DD בגין כל נזק או
            תביעה עקב שימוש בניגוד לתנאים.
          </p>

          <h4 className="font-semibold">10. שינויים והפסקת השירות</h4>
          <p>
            DD רשאית לשנות, לעדכן או להפסיק את השירות בכל עת ללא הודעה מוקדמת.
            שינויים בתנאים ייכנסו לתוקף עם פרסומם באפליקציה.
          </p>

          <h4 className="font-semibold">11. תחולת דין</h4>
          <p>
            הדין החל הוא חוקי מדינת ישראל. סמכות השיפוט הבלעדית – בתי המשפט
            בעיר תל אביב-יפו.
          </p>

          <hr className="my-3 border-gray-300" />

          <h3 className="font-bold text-sm">🔒 מדיניות פרטיות – DD</h3>
          <p>
            מדיניות זו מסבירה כיצד אנו אוספים, שומרים ומשתמשים במידע של
            משתמשי DD.
          </p>

          <h4 className="font-semibold">1. מידע שנאסף</h4>
          <ul className="list-disc pr-5 space-y-1">
            <li>פרטי זיהוי (שם, דוא&quot;ל, מזהה משתמש)</li>
            <li>נתוני שימוש (כרטיסים שנצפו, העדפות, זמני שימוש)</li>
            <li>מזהי מכשיר (Device ID, Expo Push Token)</li>
            <li>פרטי מערכת (IP, סוג מכשיר, גרסת מערכת הפעלה)</li>
          </ul>

          <h4 className="font-semibold">2. מטרת השימוש במידע</h4>
          <ul className="list-disc pr-5 space-y-1">
            <li>הפעלת השירות והתאמה אישית</li>
            <li>שליחת התראות ותוכן יומי (בהסכמה)</li>
            <li>שיפור חוויית המשתמש</li>
            <li>אבטחת מידע ומניעת שימוש לרעה</li>
          </ul>

          <h4 className="font-semibold">3. שמירת מידע ואבטחה</h4>
          <p>
            המידע נשמר בשרתים מאובטחים כגון Render ו-MongoDB Atlas. DD אינה
            מוכרת מידע אישי ואינה מעבירה אותו לצד שלישי, אלא אם החוק מחייב.
          </p>

          <h4 className="font-semibold">4. הרשאות</h4>
          <p>האפליקציה עשויה לבקש:</p>
          <ul className="list-disc pr-5 space-y-1">
            <li>התראות (תוכן יומי)</li>
            <li>אינטרנט (טעינת נתונים)</li>
            <li>אחסון/מצלמה (להעלאת תוכן בעתיד)</li>
          </ul>
          <p>ניתן לבטל הרשאות דרך הגדרות המכשיר.</p>

          <h4 className="font-semibold">5. זכויות המשתמש</h4>
          <ul className="list-disc pr-5 space-y-1">
            <li>לעיין במידע שנשמר עליו</li>
            <li>לבקש מחיקה/עדכון נתונים</li>
            <li>לבקש סגירת חשבון</li>
          </ul>
          <p>פניות ותמיכה: 055-3045229</p>

          <h4 className="font-semibold">6. קישורים חיצוניים</h4>
          <p>
            האפליקציה עשויה להכיל קישורים לאתרים אחרים. DD אינה אחראית על
            מדיניות הפרטיות או התוכן בהם.
          </p>

          <h4 className="font-semibold">7. שינויי מדיניות</h4>
          <p>
            DD רשאית לעדכן מעת לעת. שינויים משמעותיים יופיעו באפליקציה או
            יישלחו במייל. עודכן לאחרונה: 16 באוקטובר 2025
          </p>
        </div>
      )}

      <label className="flex items-center gap-2 mt-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={onToggle}
          className="w-4 h-4 accent-[#00bf63]"
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
