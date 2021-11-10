package com.example.demo;

import ch.qos.logback.classic.pattern.DateConverter;
import com.example.demo.model.Position;
import com.example.demo.repository.PositionRepository;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.format.Formatter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.Date;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class updatePositionTest {

	@Autowired
	PositionRepository repository;

	@Autowired
	MockMvc mvc;

	@Test
	@Transactional
	@Rollback
	void updatePositionTest() throws Exception {
		String sDate = "2021-12-01 12:10:15";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date myDate = formatter.parse(sDate);

		String newDate = "2021-12-01 10:10:15";
		Date myNewDate = formatter.parse(newDate);

		Position myPos = new Position();
		myPos.setTicker("CAB");
		myPos.setShares("24.5");
		myPos.setPrice("22.25");
		myPos.setPurchaseDate(myDate);
		this.repository.save(myPos);



		MockHttpServletRequestBuilder request = patch("/position/" + myPos.getId())
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\n" +
						"    \"ticker\": \"CERN\",\n" +
						"    \"shares\": " + "\"48\"" + ",\n" +
						"    \"price\": "  +  "\"17\""  + ",\n" +
						"    \"purchaseDate\": \"" + myNewDate + "\"\n" +
						"}");

		this.mvc.perform(request)
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.ticker", is("CERN")))
				.andExpect(jsonPath("$.shares", is("48")))
				.andExpect(jsonPath("$.price", is("17")));
				//.andExpect(jsonPath("$.purchaseDate", is(myNewDate)));
	}

}
