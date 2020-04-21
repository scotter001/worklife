package vn.worklife.user.util;

import java.text.MessageFormat;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import vn.worklife.security.util.WorklifeMultiLanguageController;

@Service("crunchifyEmail")
public class CrunchifyEmailAPI {
	@Autowired
	private MailSender crunchifymail; // MailSender interface defines a strategy
										// for sending simple mails
	@Resource(name="worklifeLanguageSource")
	private WorklifeMultiLanguageController worklifeMultiLanguageController;
 
	public void crunchifyReadyToSendEmail(String username, String password,String email) {
		SimpleMailMessage crunchifyMsg = new SimpleMailMessage();
		crunchifyMsg.setFrom(email);
		crunchifyMsg.setTo(email);
		crunchifyMsg.setSubject(worklifeMultiLanguageController.getMessage("label.email.title"));
		crunchifyMsg.setText(MessageFormat.format(worklifeMultiLanguageController.getMessage("label.email.information"), username, password));
		crunchifymail.send(crunchifyMsg);
	}
}
