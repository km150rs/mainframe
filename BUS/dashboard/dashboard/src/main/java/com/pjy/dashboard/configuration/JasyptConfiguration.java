package com.pjy.dashboard.configuration;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration 
public class JasyptConfiguration {
    @Bean("jasyptStringEncryptor")  // (1)
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword("pwkey");  // (2)
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        //config.setAlgorithm("PBEWITHHMACSHA512ANDAES_256");
        //config.setProviderName("SunJCE");
        //config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        //config.setIvGeneratorClassName("org.jasypt.iv.RandomIvGenerator");
        //config.setStringOutputType("base64");
        encryptor.setConfig(config);
        return encryptor;
    }
}

