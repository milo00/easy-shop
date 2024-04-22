package com.shop.shop.service;

import com.shop.shop.model.Category;
import com.shop.shop.model.Gender;
import com.shop.shop.model.MenuData;
import com.shop.shop.model.ProductType;
import com.shop.shop.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class MenuDataService {
    private final ItemRepository itemRepository;

    public MenuDataService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    private MenuData.MenuDataInner getChildrenData(MenuData.MenuDataInner parent, String childName) {
        return parent.getData().stream()
                .filter(c -> c.getName().equals(childName))
                .findFirst()
                .orElseGet(() -> {
                    MenuData.MenuDataInner newChild = new MenuData.MenuDataInner(childName, new ArrayList<>());
                    parent.getData().add(newChild);
                    return newChild;
                });
    }

    public MenuData getMenuData() {
        List<Object[]> menuData = itemRepository.findMenuData();
        MenuData resultMenuData = new MenuData();
        Map<Gender, MenuData.MenuDataInner> genderMap = new LinkedHashMap<>();

        for (Object[] row : menuData) {
            MenuData.MenuDataInner gender = genderMap.computeIfAbsent((Gender) row[0], key -> new MenuData.MenuDataInner(((Gender) row[0]).name(), new ArrayList<>()));
            var category = getChildrenData(gender, ((Category) row[1]).name());
            var subcategory = getChildrenData(category, (String) row[2]);
            subcategory.getData().add(new MenuData.MenuDataInner(((ProductType) row[3]).getProductType(), new ArrayList<>()));
        }

        resultMenuData.setGenders(new ArrayList<>(genderMap.values()));
        return resultMenuData;
    }
}
