package vn.worklife.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
//@Service
public class BeanUtil implements ApplicationContextAware {
    private static ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }
    public static <T> T getBean(Class<T> beanClass) {
        return context.getBean(beanClass);
    }
    public static <T> T getBean(String beanName, Class<T> beanClass) {
        try {
            return context.getBean(beanName, beanClass);
        } catch (BeansException e) {
            return null;
        }
    }
    public static Object getBean(String beanName) throws BeansException {
        try {
            return context.getBean(beanName);
        } catch (BeansException e) {
            return null;
        }
    }
    public static String[] getBeanDefinitionNames() {
        return context.getBeanDefinitionNames();
    }
    public static ApplicationContext getApplicationContext() {
        return context;
    }
}
