package com.pjy.dashboard.core.domain.security;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity(name="TBL_FILE_INFO")
@Getter
@Setter

public class FileEntity {
    @Id
    private String file_id;
    private String company_no;
    private String file_gb;
    
    private String orgNm;
    
    private String savedNm;
    
    private String savedPath;
    private String last_chg_user;
    private String last_chg_date;

    @Builder
    public FileEntity(String company_no,String file_gb,String file_id,String orgNm, String savedNm, String savedPath,String last_chg_user,String last_chg_date) {
        this.company_no = company_no;
        this.file_gb = file_gb;
        this.orgNm = orgNm;
        this.savedNm = savedNm;
        this.savedPath = savedPath;
        this.file_id = file_id;
        this.last_chg_user = last_chg_user;
        this.last_chg_date = last_chg_date;
    }
}