package vn.worklife.security.util;

import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.util.Locale;

public class WorklifeMultiLanguageController {

    private ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource;

    /**
     * getReloadableResourceBundleMessageSource()
     *
     * @return ReloadableResourceBundleMessageSource
     */
    public ReloadableResourceBundleMessageSource getReloadableResourceBundleMessageSource() {
        return reloadableResourceBundleMessageSource;
    }

    /**
     * getReloadableResourceBundleMessageSource()
     *
     * @param reloadableResourceBundleMessageSource - resource MessageSource
     * @return ReloadableResourceBundleMessageSource
     */
    public void setReloadableResourceBundleMessageSource(ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource) {
        this.reloadableResourceBundleMessageSource = reloadableResourceBundleMessageSource;
    }
    /**
     * Find message code
     *
     * @param code - Message Code
     * @return String
     */
    public String getMessage(String code) {
        return getReloadableResourceBundleMessageSource().getMessage(code, null, Locale.getDefault());
    }
}