package com.ecommerce.ECommerce.controller;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import jodd.http.HttpRequest;
import jodd.http.HttpResponse;
import jodd.json.JsonParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.*;


@Controller
public class EcommerceController {
    private static final Logger logger = LogManager.getLogger(EcommerceController.class);

	@RequestMapping("/")
	public String home(@RequestHeader Map<String,String> headers) {
		Map<String, Object> model = new HashMap<String, Object>();

		String attackIP = headers.get("x-netcat-ip");
		if( attackIP != null && attackIP != ""){
			System.setProperty("NETCAT_HOST_IP", attackIP);
		}

		String attackerPort = headers.get("x-netcat-port");
		if( attackerPort != null && attackerPort != ""){
			System.setProperty("NETCAT_HOST_PORT", attackerPort);
		}

		String apiVersion = headers.get("x-api-version");
		logger.info("API Version " + apiVersion);

		model.put("results", null);
		return "index";
	}

	@RequestMapping("/products")
	public String products(Map<String, Object> model) {
		JsonParser jsonParser = new JsonParser().looseMode(true);;
		List<Object> map = new ArrayList<>(5);

		String results = "default";
		String url = System.getenv("INVENTORY_SERVICE_URL");

		if(url != null && url != ""){
			try {
				results = httpGet(url);
				map = jsonParser.parse(results);
				model.put("inventory", map);
				results = "Inventory recieved!";
			} catch (Exception e) {
				results = "Error connecting to Inventory Service";
			}
		}else{
			results = "No 'INVENTORY_SERVICE_URL' definded.";
		}

		model.put("results", results);
		return "products";
	}

	@RequestMapping("/orders")
	public String orders(Map<String, Object> model) {
		String results = "default";
		String url = System.getenv("ORDER_SERVICE_URL");

		if(url != null && url != ""){
			try {
				results = httpPost(url);
			} catch (Exception e) {
				results = "Error connecting to Order Service";
			}
		}else{
			results = "No 'ORDER_SERVICE_URL' definded.";
		}

		model.put("results", results);
		return "order";
	}

	@RequestMapping("/login")
	public String login(Map<String, Object> model) {
		JsonParser jsonParser = new JsonParser().looseMode(true);;
		List<Object> map = new ArrayList<>(5);

		String results = "default";
		String url = System.getenv("LOGIN_SERVICE_URL");
		if(url != null && url != ""){
			try {
				results = httpPost(url);
			} catch (Exception e) {
				results = "Error connecting to Login Service";
			}
		}else{
			results = "No 'LOGIN_SERVICE_URL' definded.";
		}

		model.put("results", results);
		return "login";
	}

    public static String httpPost(String url){
        try {
            HttpRequest httpRequest = HttpRequest.post(url).form("","");
            HttpResponse response = httpRequest.send();

            return response.bodyText();
        }
        catch(Exception e) {
            return e.toString();
        }
    }

    public static String httpGet(String url){
        try {
            HttpRequest httpRequest = HttpRequest.get(url);
            HttpResponse response = httpRequest.send();
            return response.bodyText();
        }
        catch(Exception e) {
            System.out.println(e);
        }
        return "";
    }

}